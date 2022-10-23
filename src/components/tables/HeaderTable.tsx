import React, {FunctionComponent} from 'react';
import {IHeaderTable} from "../../models/IHeaderTable";
import {Box, Grid, Typography} from "@mui/material";

interface OwnProps extends IHeaderTable {

    // order: "asc" | "desc",
    // onClick: (event: React.MouseEvent<unknown>) => void,

}

type Props = OwnProps;


const HeaderTable: FunctionComponent<Props> = ({size, align, headerName}) => {
    return (
        <Grid item xs={size}>
            <Box alignItems={align} padding={1}>
                <Typography align={"center"}>
                    {headerName}
                </Typography>

            </Box>
        </Grid>
    );
};

export default HeaderTable;
