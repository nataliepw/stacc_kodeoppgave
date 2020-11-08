import { makeStyles } from '@material-ui/core/styles';
import TableDownPayment from './TableDownPayment'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(5),
            width: theme.spacing(150),
            height: theme.spacing(50),
        },
    },
}));


function DownPaymentList({ list }) {
    const classes = useStyles()


    return (
        <div >
            <h1>Mine nedbetalingsplaner: {list.length}</h1>
            {list.map(payment =>
            <div className={classes.root}>
                <TableDownPayment plan={payment} />
            </div> 
            )}
        </div>

    )

}
export default DownPaymentList;