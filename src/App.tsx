import { Link } from "react-router-dom"

function App() {
  return (
    <div className={"size-full flex flex-col justify-center"}>
      <div className={"self-center text-5xl p-10"}>
        Welcome to my <strong>Master Components</strong> !
      </div>
      <p className={"self-center"}>
        This is a collection of components that I have created to help me build
        my projects faster. Please see my fantastic components below.
      </p>
      <h2 className={"self-start text-3xl p-10"}>Components</h2>
      <ul className={"list-disc pl-20"}>
        <li className={"h-10"}>
          <Link to={"/master-ui/panel"}>Master Panel</Link>
        </li>
        <li className={"h-10"}>
          <Link to={"/master-ui/dock"}>Master Dock</Link>
        </li>
      </ul>
    </div>
  )
}

export default App
