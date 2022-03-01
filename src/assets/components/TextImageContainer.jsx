import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import GoodLink from './GoodLink';
import "./css/styles.css";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Button, Divider } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: "12px",
    width: "70px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "#D6D0C4",
    },
    [`& .${linearProgressClasses.bar}`]: {
        backgroundColor: "#927F64",
    },
}));

const ColorButton = styled(Button)(() => ({
    color: "#32362D",
    backgroundColor: "#fcd567",
    textAlign: "center",
    borderRadius: "3px",
    textTransform: "none",
    width: "100%",
    '&:hover': {
        cursor: "pointer",
        backgroundColor: "#fcd567",
    },
}));

const useStyles = makeStyles({
    container: {
        padding: "0"
    },
    span: {
        fontSize: "2.3em",
        color: "white"
    },
    subSpan: {
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: "1em",
        color: "white"
    },
    subSubSpan: {
        textAlign: "left",
        fontSize: "1.1em",
        color: "white"
    },
    challengeContainer: {
        height: "15px",
        width: "70%",
    },
    bookNumber: {
        fontSize: "1.6em",
        pading: 0,
        margin: 0
    },
    status: {
        fontSize: "0.9em",
    },
    littleText: {
        fontSize: "0.8em"
    },
    statistica: {
        color: "white",
        fontSize: "0.9em",
        paddingBottom: "30px"
    }
});

export default function TextImageContainer(props) {
    const classes = useStyles();

    return (
        <>
            <Stack direction={props.direction} spacing={2} sx={{ pb: "10px" }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.container}
                    style={{
                        backgroundColor: props.color,
                        width: props.width,
                    }}
                >
                    <span className={`${classes.span} latoB`}>
                        {props.title}
                    </span>
                    <img
                        height={props.imgHeight}
                        width={props.imgWeight}
                        src={props.imgSrc}
                        alt={`${props.title}-img`}
                    />
                    {props.subTitle && (<span className={`${classes.subSpan} latoB`}>{props.subTitle}</span>)}

                    {props.subSubTitle && (
                        <Stack
                            spacing={2}
                            direction={props.direction}
                            alignItems="flex-start"
                            sx={{ width: "80%" }}
                        >
                            {props.subSubTitle && (
                                <span className={`${classes.subSubSpan} meriB`}>
                                    {props.subSubTitle}
                                </span>
                            )}
                            <ColorButton className={"latoB"} disableRipple>
                                {props.button}
                            </ColorButton>

                            <span className={`${classes.statistica} latoR`}>
                                {props.status}
                            </span>
                        </Stack>
                    )}

                </Stack>

                {props.textStaus && (
                    <Stack>
                        <span className={`${classes.bookNumber} latoB`}>1</span>
                        <GoodLink
                            titleText={"books completed"}
                            classes={"grBrown latoR"}
                        />
                        <span className={`${classes.littleText} latoR grGrey`}>1 book ahead of schedule</span>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <BorderLinearProgress variant="determinate" value={10} />
                            <span className={`${classes.status} latoR grBrown`}>1/6 (17%)</span>
                        </Stack>
                        <GoodLink
                            size="0.9em"
                            classes={"grGreen latoR"}
                            titleText="View Challenge"
                        />
                    </Stack>
                )}
            </Stack>
            <Divider />
        </>
    );
}