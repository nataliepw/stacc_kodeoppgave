import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

//Material UI Table
function createData(terminbelop, renter, gebyr, restgjeld, innbetalingsdato) {
    return { terminbelop, renter, gebyr, restgjeld, innbetalingsdato };
}

function TableDownPayment({ plan }) {
    const classes = useStyles();

    
    //creating the rows for displaying data by mapping the array from response
    const rows = plan.map(row =>
        createData(row.innbetaling, row.renter, row.gebyr, row.restgjeld, row.dato))
    
    
    //show table content
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Terminbeløp</TableCell>
                        <TableCell align="right">Renter</TableCell>
                        <TableCell align="right">Gebyr</TableCell>
                        <TableCell align="right">Restgjeld</TableCell>
                        <TableCell align="right">Innbetalingsdato</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                {row.terminbelop}
                            </TableCell>
                            <TableCell align="right">{row.renter}</TableCell>
                            <TableCell align="right">{row.gebyr}</TableCell>
                            <TableCell align="right">{row.restgjeld}</TableCell>
                            <TableCell align="right">{row.innbetalingsdato}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default TableDownPayment;