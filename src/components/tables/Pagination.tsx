import React, {MouseEvent} from "react";
import {Box, IconButton, useTheme} from "@mui/material";
import {FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage} from "@mui/icons-material";

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function Pagination(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box flexShrink={0} ml={theme.spacing(2.5)}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label={'tables.firstPage'}
            >
                {theme.direction === "rtl" ? <LastPage/> : <FirstPage/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label={'tables.previous'}
            >
                {theme.direction === "rtl" ? (<KeyboardArrowRight/>) : (<KeyboardArrowLeft/>)}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label={'tables.next'}
            >
                {theme.direction === "rtl" ? (<KeyboardArrowLeft/>) : (<KeyboardArrowRight/>)}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label={'tables.lastPage'}
            >
                {theme.direction === "rtl" ? <FirstPage/> : <LastPage/>}
            </IconButton>
        </Box>
    );
}

export default Pagination;
