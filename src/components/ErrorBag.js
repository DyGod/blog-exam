import { Alert } from "react-bootstrap";


const ErrorBag = ({errors}) => {
    
    if(Object.keys(errors).length  === 0){
        return "";
    }

    return <Alert variant="danger" className="text-left">
        {errors.message}
        <ul>
            { Object.values(errors.errors).map( (err, i) => {
                return <li key={i}>{err[0]}</li>
            }) } 
        </ul>
    </Alert>;
}



export default ErrorBag;