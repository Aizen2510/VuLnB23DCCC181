﻿import component from "@/locales/en-US/component";
import Icon from "@ant-design/icons";
import { icons } from "antd/lib/image/PreviewGroup";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path:'/study',
		name: 'appStuty',
		component: './appStuty',
		icon: 'BookOutlined',
	},
	{
		path: '/guessing-game',
		name: 'Guessing Game',
		component: './GuessingGame/GuessingGame',
		hideInMenu: false,
		icon: 'FieldNumberOutlined',
	},
	{
		path: '/',
		name: 'Ngân Hàng Câu Hỏi', 
		icon: 'LineChartOutlined',
		routes: [
			{
				path: '/subjectManage',
				name: 'Quản Lí Môn Học', 
				component: './Subject/index.tsx', 
			},
			{
				path: '/examManaget',
				name: 'Quản Lí Đề Thi',
				component: './Exam',
			},
			{
				path: '/questionManaget',
				name: 'Quản Lí Câu Hỏi',
				component: './question',
			},
		],
	},
	{
		path: '/RockPaperGame',
		name: 'RockPaperGame',
		component: './RockPaperScisssorsGame/rockPaperScisssorsGame',
		hideInMenu: false,
		icon: 'FieldNumberOutlined'
	},

	

	



	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
