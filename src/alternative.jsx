import Page from "./components/page"

export default function index() {
  return (
    <Page>
      <a href="index.html" style="font-size: 48px;">С перспективой</a> <br />
      <a href="alternative.1.html" style="font-size: 48px;">С перспективой и без затухания</a>
      <div className="cloud cloud--1">
        <div className="cloud__words"> </div>
      </div>
    </Page>
  )
}