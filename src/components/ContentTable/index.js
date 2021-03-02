import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      width: 120,
    },
  },
  body: {
    fontSize: 14,
    fontWeight: 800,
  },
}))(TableCell);
const useStyles = makeStyles((theme) => ({
  table: {
    [theme.breakpoints.down('sm')]: {
      minWidth: 400,
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 500,
    },
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    color: '#3f51b5',
  },
}));
const reducer = (a, b) => a + b;

export default function BasicTable({ randomMenusList }) {
  const classes = useStyles();
  let sum = 0;

  const result = randomMenusList.forEach((menus) => {
    if (menus.price === '') {
      return (sum = NaN);
    } else {
      sum += Number(menus.price);
    }
    return sum;
  });

  return (
    <TableContainer>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>メニュー</StyledTableCell>
            <StyledTableCell>おいくら¥</StyledTableCell>
            <StyledTableCell>その他</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {randomMenusList.map((menus) =>
            menus.name ? (
              <TableRow style={{ wordBreak: 'break-all' }} key={menus.name}>
                <TableCell component="th" scope="row">
                  {menus.name}
                </TableCell>
                <TableCell>{menus.price}</TableCell>
                <TableCell>{menus.content}</TableCell>
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>
      <Typography align="center" style={{ color: '#d675af' }}>
        　{isNaN(sum) ? '計算できません！' : '合計：' + sum + '円'}
      </Typography>
    </TableContainer>
  );
}
