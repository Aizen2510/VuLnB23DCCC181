import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Space,
  Button,
  Row,
  Col,
  Alert,
  List,
  Tag,
  Divider,
  Modal,
  Statistic,
  Skeleton,
} from "antd";
import "./rockPaperScisssorsGame.css";
import {
  PlayCircleOutlined,
  ScissorOutlined,
  StopOutlined,
  FileOutlined,
  HistoryOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import handPaper from "../../assets/hand-solid.svg";
import handScissor from "../../assets/hand-scissors-solid.svg";
import handRock from "../../assets/hand-back-fist-solid.svg";
const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
type Choice = "Kéo" | "Búa" | "Bao"; // tạo kiểu dữ liệu Choice nhận 3 giá trị
interface GameResult {
  playerChoice: Choice;
  computerChoice: Choice;
  result: "Thắng" | "Thua" | "Hòa";
}
const rockPaperScisssorsGame: React.FC = () => {
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [gameState, setGameState] = useState<
    "waiting" | "pause" | "playing" | "exit"
  >("waiting");
  const [feedback, setFeedback] = useState<String>("");
  const [result, setResult] = useState<String>("");
  const [history, setHistory] = useState<GameResult[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const choises: Choice[] = ["Kéo", "Búa", "Bao"];

  const totalGames = history.length;
  const wins = history.filter((game) => game.result === "Thắng").length;
  const losses = history.filter((game) => game.result === "Thua").length;
  const draws = history.filter((game) => game.result === "Hòa").length;
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    // setLoading(true);
    // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    console.log("Game State: ", gameState);
    console.log("Computer Choice: ", computerChoice);
    console.log("Player Choice", playerChoice);
    // loadMoreData();
  }, [gameState, computerChoice]);

  const startGame = () => {
    setGameState("playing");
    setFeedback("Cùng chơi nào");
  };
  const getRandomChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choises[randomIndex];
  };

  const determineWinner = (player: Choice, computer: Choice): String => {
    if (player === computer) return "Hòa";
    if (
      (player === "Kéo" && computer === "Bao") ||
      (player === "Búa" && computer === "Kéo") ||
      (player === "Bao" && computer === "Búa")
    ) {
      return "Thắng";
    } else return "Thua";
  };
  const playGame = (choice: Choice) => {
    const compChoice = getRandomChoice();
    const resultGame = determineWinner(choice, compChoice);
    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    setResult(resultGame);

    if (resultGame === "Thắng") {
      setPoints((prev) => prev + 10);
    } else if (resultGame === "Thua") {
      setPoints((prev) => prev - 5);
    }

    setHistory((prev) => [
      {
        playerChoice: choice,
        computerChoice: compChoice,
        result: resultGame as "Thắng" | "Thua" | "Hòa",
      },
      ...prev,
    ]);
  };

  const getResultColor = (result: String) => {
    switch (result) {
      case "Thắng":
        return "green";
      case "Thua":
        return "red";
      case "Hòa":
        return "blue";
      default:
        return "gray";
    }
  };

  const exitGame = () => {
    setHistory([]);
    setPoints(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setGameState("waiting");
  };

  return (
    <Layout className="game-container">
      <Header className="game-header">
        <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
          🎮 Oẳn tù xì
        </Title>
      </Header>
      <Content>
        <Card className="game-card">
          {gameState === "waiting" ? (
            <Space direction="vertical" size="large" className="game-space">
              <Paragraph>Hãy thử xem bạn có thắng máy tính không nào</Paragraph>
              <Button
                type="primary"
                icon={<PlayCircleOutlined />}
                onClick={startGame}
              >
                Bắt Đầu Chơi
              </Button>
            </Space>
          ) : (
            <Space size="large" direction="vertical" style={{ width: "100%" }}>
              {result && (
                <Alert
                  message={`Kết quả: ${result}`}
                  type={
                    result === "Thắng"
                      ? "success"
                      : result === "Thua"
                      ? "error"
                      : "info"
                  }
                  showIcon
                  className="result-alert"
                />
              )}
              <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col>
                  <Text strong className="points-display">
                    Điểm: {points}
                  </Text>
                </Col>

                <Col>
                  <Button type="primary" danger onClick={exitGame}>
                    Thoát game
                  </Button>
                </Col>
              </Row>
              <Row gutter={[16, 24]} justify="center">
                <Col>
                  <Space size="large">
                    <Button
                      size="large"
                      onClick={() => playGame("Kéo")}
                      className="choice-button"
                    >
                      <img src={handScissor} alt="" />
                      Kéo
                    </Button>
                    <Button
                      size="large"
                      onClick={() => playGame("Búa")}
                      className="choice-button"
                    >
                      <img src={handRock} alt="" />
                      Búa
                    </Button>
                    <Button
                      size="large"
                      onClick={() => playGame("Bao")}
                      className="choice-button"
                    >
                      <img src={handPaper} alt="" />
                      Bao
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Space>
          )}

          {gameState === "playing" && (
            <>
              <Divider />
              <Row gutter={[16, 16]} justify="center">
                <Col>
                  <Button
                    type="default"
                    icon={<HistoryOutlined />}
                    onClick={() => setShowHistory(true)}
                    className="action-button"
                  >
                    Lịch sử đấu
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    icon={<BarChartOutlined />}
                    onClick={() => setShowStats(true)}
                    className="action-button"
                  >
                    Thống kê
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {playerChoice && (
            <Row gutter={[16, 24]} justify="center" style={{ marginTop: 24 }}>
              <Col span={24}>
                <Card className="current-game-card">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Text strong>
                      Bạn chọn:{" "}
                      <span className="choice-text">{playerChoice}</span>
                    </Text>
                    <Text strong>
                      Máy chọn:{" "}
                      <span className="choice-text">{computerChoice}</span>
                    </Text>
                    <Text strong>
                      Kết quả:
                      <span
                        style={{ color: getResultColor(result), marginLeft: 8 }}
                      >
                        {result}
                      </span>
                    </Text>
                  </Space>
                </Card>
              </Col>
            </Row>
          )}
        </Card>
      </Content>

      <Modal
        title="Lịch sử đấu"
        visible={showHistory}
        onCancel={() => setShowHistory(false)}
        footer={[
          <Button key="close" onClick={() => setShowHistory(false)}>
            Đóng
          </Button>,
        ]}
        width={600}
      >
        {history.length > 0 ? (
          <InfiniteScroll
            dataLength={history.length}
            next={loadMoreData}
            hasMore={history.length < 50}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={history}
              renderItem={(item, index) => (
                <List.Item className="history-item">
                  <Text>
                    Ván {history.length - index}: Bạn ({item.playerChoice}) vs
                    Máy ({item.computerChoice}) -
                    <Tag
                      color={getResultColor(item.result)}
                      style={{ marginLeft: 8 }}
                    >
                      {item.result}
                    </Tag>
                  </Text>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        ) : (
          <Paragraph className="empty-history">
            Chưa có lịch sử đấu nào
          </Paragraph>
        )}
      </Modal>

      <Modal
        title="Thống kê chi tiết"
        visible={showStats}
        onCancel={() => setShowStats(false)}
        footer={[
          <Button key="close" onClick={() => setShowStats(false)}>
            Đóng
          </Button>,
        ]}
        width={600}
      >
        <Row gutter={[16, 16]} className="stats-container">
          <Col span={12}>
            <Statistic title="Tổng số trận" value={totalGames} suffix="trận" />
          </Col>
          <Col span={12}>
            <Statistic
              title="Tỷ lệ thắng"
              value={winRate}
              suffix="%"
              valueStyle={{ color: "#3f8600" }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Thắng"
              value={wins}
              valueStyle={{ color: "green" }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Thua"
              value={losses}
              valueStyle={{ color: "red" }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Hòa"
              value={draws}
              valueStyle={{ color: "blue" }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Điểm hiện tại"
              value={points}
              valueStyle={{ color: points >= 0 ? "#3f8600" : "#cf1322" }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Điểm trung bình mỗi trận"
              value={totalGames > 0 ? (points / totalGames).toFixed(1) : 0}
            />
          </Col>
        </Row>
      </Modal>
    </Layout>
  );
};
export default rockPaperScisssorsGame;