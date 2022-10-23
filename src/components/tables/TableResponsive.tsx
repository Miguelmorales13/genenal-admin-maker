import React, {ChangeEvent, FunctionComponent, MouseEvent, useState} from "react";
import {IHeaderTable} from "../../models/IHeaderTable";
import HeaderTable from "./HeaderTable";
import ColumnTable from "./ColumnTable";
import {Pagination} from "@mui/lab";
import {filterByObject, Order, stableSort} from "../../utils";
import {EnumColumnTable} from "../../data-modeler";
import NoDataTable from "./NoDataTable";
import {Sort} from "@mui/icons-material";
import {Box, Card, Collapse, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Slide, TextField, useMediaQuery, useTheme} from "@mui/material";


interface OwnProps {
    rows: any[],
    headers: IHeaderTable[]
    loading: boolean
    filters: string[]
}

type Props = OwnProps;


const TableResponsive: FunctionComponent<Props> = ({rows, headers, loading, filters}) => {
        const [page, setPage] = useState(0);
        const [filter, setFilter] = useState("");
        const [order, setOrder] = useState<Order>('asc');
        const [orderBy, setOrderBy] = useState('id');
        const rowsPerPage = 10
        // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const handleChangePagination = (e: any, value: number) => setPage(value - 1)
        const handleChangeOrderBy = (e: SelectChangeEvent<any>) => setOrderBy(e.target.value)
        const handleChangeFilter = (e: ChangeEvent<any>) => setFilter(e.target.value)
        const handleChangeOrder = (e: MouseEvent) => setOrder(state => state === "asc" ? "desc" : 'asc')
        const rowsFilters = rows.filter((value) => filterByObject<any>(value, filter, filters))

        const theme = useTheme()
        const minSize = useMediaQuery(theme.breakpoints.down("sm"))

        const sizePages = Math.ceil(rowsFilters.length / rowsPerPage)

        return (
            <Box overflow={"hidden"}>
                <Grid container m={"auto"} p={theme.spacing(0, 1, 0, 1)}>
                    <Grid item xs={12}>
                        <TextField disabled={loading} variant="outlined" margin="dense" label={'Find'} value={filter} onChange={handleChangeFilter} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Slide direction={"down"} in={!minSize}>
                            <Card variant="outlined">

                                <Grid container>
                                    {!minSize && headers && headers.map((header, i) => (
                                        <HeaderTable key={`header-${i}`} {...header}/>
                                    ))}

                                </Grid>

                            </Card>
                        </Slide>

                    </Grid>
                    <Grid item xs={12}>
                        <Collapse in={rowsFilters.length <= 0}>
                            <NoDataTable loading={loading}/>
                        </Collapse>
                    </Grid>

                    <Slide direction="up" mountOnEnter unmountOnExit in={rowsFilters.length > 0}>
                        <Grid item xs={12}>

                            {
                                stableSort(rowsFilters, orderBy, order)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => (
                                        <Card style={{marginTop: theme.spacing(0.5), padding: theme.spacing(0.5)}} variant="outlined" key={i}>
                                            <Grid container>
                                                {
                                                    headers && headers
                                                        .map(({align, type, size, field, headerName}, j) => (
                                                            <ColumnTable key={`column-${i}-${j}`} size={size} minSize={minSize}
                                                                         type={type} align={align} row={row} field={field}
                                                                         headerName={headerName}/>
                                                        ))
                                                }

                                            </Grid>

                                        </Card>

                                    ))
                            }


                        </Grid>
                    </Slide>
                    <Grid item xs={12}>
                        <Box flexWrap="wrap" display={"flex"} justifyContent={"space-between"} mt={theme.spacing(2)}>
                            <div>
                                <Select margin="dense" style={{
                                    backgroundColor: theme.palette.secondary.main,
                                    color: theme.palette.secondary.contrastText,
                                }} value={orderBy} variant="outlined" onChange={handleChangeOrderBy}>
                                    {headers.filter(head => head.type === EnumColumnTable.Normal).map((head, i) => (
                                        <MenuItem dense key={`select-order-${i}`} value={head.field}>{head.headerName}</MenuItem>
                                    ))}
                                </Select>
                                <IconButton onClick={handleChangeOrder} color={order === "asc" ? "primary" : 'secondary'}>
                                    <Sort/>
                                </IconButton>
                            </div>
                            <Pagination style={{display: 'flex', justifyContent: 'flex-end'}} size="small" siblingCount={0} boundaryCount={1} count={sizePages} page={page + 1} variant="outlined"
                                        disabled={sizePages === 1} onChange={handleChangePagination}/>

                        </Box>
                    </Grid>

                </Grid>
            </Box>

        )
    }
;


export default TableResponsive
