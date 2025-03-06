import React, { useState, useEffect } from "react";
import { Layout, Card, Typography, Button, Input, Form, Tag, Progress, Alert, Space, Divider, Row, Col } from "antd";
import { PlayCircleOutlined, SendOutlined, ReloadOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const GuessingGame: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [guess, setGuess] = useState<string>("");
  const [turn, setTurn] = useState<number>(10);
  const [gameState, setGameState] = useState<"waiting" | "lost" | "playing" | "win">("waiting");// new 
  const [previousGuesses, setPreviousGuesses] = useState<{ value: number; result: string }[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("Game State:", gameState);
    console.log("Random Number:", randomNumber);
  }, [gameState, randomNumber]);

  const startGame = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newNumber);
    setGuess("");
    form.resetFields();
    setTurn(10);
    setGameState("playing");
    setPreviousGuesses([]);
    setFeedback("Hãy đoán một số từ 1 đến 100!");
  };

  const checkGuess = () => {
    const guessedNumber = parseInt(guess);

    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
      setFeedback("Vui lòng nhập một số từ 1 đến 100!");
      return;// giong 
    }

    const turnRemaining = turn - 1;
    setTurn(turnRemaining);
    const guessResult =
      guessedNumber < (randomNumber ?? 0) ? "low" : guessedNumber > (randomNumber ?? 0) ? "high" : "correct";

    setPreviousGuesses([...previousGuesses, { value: guessedNumber, result: guessResult }]);// ls 

    if (guessedNumber === randomNumber) {
      setFeedback("Chúc mừng! Bạn đã đoán đúng!");
      setGameState("win");
    } else if (turnRemaining === 0) {
      setFeedback(`Bạn đã hết lượt đoán! Số đúng là ${randomNumber}.`);
      setGameState("lost");
    } else {
      setFeedback(
        guessedNumber < (randomNumber ?? 0)
          ? `Bạn đoán quá thấp! Còn ${turnRemaining} lượt.`
          : `Bạn đoán quá cao! Còn ${turnRemaining} lượt.`
      );
    }//ok 
    setGuess("");
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <Header style={{ background: "transparent", padding: "20px" }}>
        {/* tách ra model riêngriêng */}
        <Title level={2} style={{ textAlign: "center" }}>🎮 Trò Chơi Đoán Số</Title>
      </Header>
      <Content style={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: 500, borderRadius: 16 }}>
          {gameState === "waiting" ? (
            <Space direction="vertical" size="large" style={{ width: "100%", textAlign: "center" }}>
              <Paragraph>Hệ thống sẽ sinh ra một số ngẫu nhiên từ 1 đến 100. Bạn có 10 lượt để đoán đúng!</Paragraph>
              <Button type="primary" icon={<PlayCircleOutlined />} onClick={startGame}>Bắt Đầu Chơi</Button>
            </Space>
          ) : (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Progress percent={turn * 10} showInfo={false} strokeWidth={12} style={{ marginBottom: 10 }} />
              <Text type="secondary">Còn {turn} lượt đoán</Text>
              <Alert message={feedback} style={{ marginBottom: 20 }} />
              <Form form={form} onFinish={checkGuess} layout="vertical" disabled={gameState !== "playing"}>
                <Row gutter={16}>
                  <Col span={18}>
                    <Form.Item name="guessNumber">
                      <Input type="number" placeholder="Nhập số từ 1-100" onChange={(e) => setGuess(e.target.value)} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Button type="primary" icon={<SendOutlined />} onClick={checkGuess} disabled={gameState !== "playing"} block />
                  </Col>
                </Row>
              </Form>
              {previousGuesses.length > 0 && (
                <>
                  <Divider>Lịch sử đoán</Divider>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                    {previousGuesses.map((item, index) => (
                      <Tag key={index}>{item.value}</Tag>
                    ))}
                  </div>
                </>
              )}
              {(gameState === "win" || gameState === "lost") && (
                <Button type="primary" icon={<ReloadOutlined />} onClick={startGame} block>Chơi Lại</Button>
              )}
            </Space>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default GuessingGame;