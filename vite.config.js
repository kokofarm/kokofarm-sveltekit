import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
		  	// 서빙 허용 목록에 'libs' 디렉토리 추가
			allow: [resolve(process.cwd(), 'libs')]
		}
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
