import Page from "./components/page"

export default function index() {
	return (
		<Page>
			<a href="alternative.html" style="font-size: 48px;">Без перспективы</a> <br />
			<a href="alternative.1.html" style="font-size: 48px;">Без перспективы и без затухания</a>
			<div className="cloud">
				<div className="cloud__words"> </div>
			</div>
		</Page>
	)
}