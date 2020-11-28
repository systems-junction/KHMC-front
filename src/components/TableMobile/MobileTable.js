import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import EditIcon from "@material-ui/icons/Edit"
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  typographyMain: {
    fontSize: 12,
    color: "grey",
  },
  typographySecondary: {
    fontSize: 13,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  button: {
    width: 60,
    textTransform: "none",
    fontSize: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  editButton: {
    width: "100%",
    textTransform: "none",
    fontSize: 14,
  },
}))

export default function ControlledAccordions() {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container spacing={3}>
            <Grid item xs={4} sm={4}>
              <Typography className={classes.typographyMain} variant="h6">
                Doctor Ref
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography className={classes.typographyMain} variant="h6">
                Consultant
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography className={classes.typographyMain} variant="h6">
                Status
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography className={classes.typographySecondary} variant="h6">
                Dr. Hammad
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography className={classes.typographySecondary} variant="h6">
                Dr. Asad
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
              >
                Pending
              </Button>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography className={classes.typographyMain} variant="h6">
                Description
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography className={classes.typographySecondary} variant="h6">
                Each doctor's note is a few paragraph long, written in a clear,
                straigtforward style designed to engage and inform you.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography className={classes.typographyMain} variant="h6">
                Doctor Voice Note
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper elevation={2} className={classes.paper}>
                <Typography className={classes.typographyMain} variant="h6">
                  Audio Here
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.editButton}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
