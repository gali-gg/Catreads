import blueBanner from "../images/blue-banner.jpg";
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    banner: {
        background: "#B7BFFD",
        justifyContent:"center",
        alignItems:"center"
    }
});

export default function BlueBanner() {
    const classes = useStyles();

    return (
        <Stack className={classes.banner}>
            <img height={40} src={blueBanner} alt="blue-banner" />
        </Stack>
    )
}