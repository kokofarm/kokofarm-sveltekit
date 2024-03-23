import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port:5173,
		strictPort:true,
		fs: {
		  	// 서빙 허용 목록에 'libs' 디렉토리 추가
			allow: [resolve(process.cwd(), 'libs')]
		},
		// host: true,
		// hmr: {
		// 	port: 8886,
		// 	protocol: "wss",
		// },
	  },
	preview:{
		port:4173,
		strictPort:true,
	},
	resolve: {
	alias: [
		{ find: "~", replacement: resolve(__dirname) },
		{ find: "@", replacement: resolve(__dirname, "src") },
		{
			find: "@components",
			replacement: resolve(__dirname, "src/components"),
		},
		{
			find: "@store",
			replacement: resolve(__dirname, "src/store"),
		},
	],
	},
});
