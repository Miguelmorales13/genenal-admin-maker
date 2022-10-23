import React, {FunctionComponent} from 'react';
import CircleSpinner from "../spinners/CircleSpinner";
import {Box, CardContent} from "@mui/material";

interface OwnProps {
    loading: boolean
}

type Props = OwnProps;

const NoDataTable: FunctionComponent<Props> = ({loading}) => {
        return (
            <Box width={"100%"} minHeight={"50vh"} justifyContent={"center"} display={"flex"} alignItems={"center"}>
                <CardContent>
                    {loading && <CircleSpinner/>}
                    {loading ? 'tables.loading' : 'tables.noData'}
                </CardContent>
            </Box>
        );
    }
;

export default NoDataTable;
