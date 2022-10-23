import React, {FunctionComponent} from 'react';
import {Box, Grid} from "@mui/material";

export interface HeaderItem {
    title: string;
    key: any;
}

interface OwnProps {
    object: any,
    headers: HeaderItem[]
}

type Props = OwnProps;

const Item: FunctionComponent<Props> = ({headers, object}) => {
    const getValue = (header: HeaderItem) => {
        if (typeof header.key === 'function') {
            return header.key(object)
        }
        return object[header.key]
    }

    return (
        <div>
            {
                headers.map((header, i) => (
                    <Grid component={Box} container key={`${i}`}>
                        <Grid item xs={12} md={6}>
                            {header.title}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {getValue(header)}
                        </Grid>
                    </Grid>
                ))
            }
        </div>

    );
};

export default Item;
