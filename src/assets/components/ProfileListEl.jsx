import moment from "moment";
import Moment from "react-moment";
import Title from "./Title";

export default function ProfileListEl(props) {
    return (
        <tr>
            <td>
                <Title title={props.title} className="latoB grBrown" />
            </td>
            <td colSpan={10}></td>
            <td>
                {props.location && <span className="latoR grBrown f-09">{props.location}</span>}
                {props.joined && <Moment from={moment.now()} className="latoR grBrown f-09">{props.joined}</Moment>}
            </td>
        </tr>
    )
}