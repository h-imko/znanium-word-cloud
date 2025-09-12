import Page from "./components/page"

export default function index() {
  return (
    <Page>
      <a href="index.html" style="font-size: 48px;">С перспективой</a> <br />
      <a href="alternative.html" style="font-size: 48px;">Без перспективы</a>
      <div className="cloud cloud--2">
        <div className="cloud__words"> </div>
      </div>
    </Page>
  )
}