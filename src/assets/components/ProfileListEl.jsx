import moment from "moment";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Title from "./Title";

export default function ProfileListEl(props) {
    const user = useSelector(state => state.userData);

    const [isGetLocation, setIsGetLocation] = useState(false);
    useEffect(() => {
        setIsGetLocation(true)
    }, [user.location]);

    const [isGetJoined, setIsGetJoined] = useState(false);
    useEffect(() => {
        setIsGetJoined(true)
    }, [user.joined]);

    return (
        <tr>
            <td>
                <Title title={props.title} className="latoB grBrown" />
            </td>
            <td colSpan={10}></td>
            <td>
                {props.location && isGetLocation && <span className="latoR grBrown f-09">{user.location}</span>}
                {props.date && isGetJoined && <Moment from={moment.now()} className="latoR grBrown f-09">{user.joined}</Moment>}
            </td>
        </tr>
    )
}