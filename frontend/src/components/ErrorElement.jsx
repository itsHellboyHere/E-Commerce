import { useRouteError } from "react-router-dom"

useRouteError
const ErrorElement = () => {
    const error = useRouteError()

  return (
    <h4 className=" align-element font-bold text-4xl ">There was an error...</h4>
  )
}
export default ErrorElement