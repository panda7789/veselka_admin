import React from 'react';
import { List, Datagrid, Create, SimpleForm, ImageInput, ImageField } from 'react-admin';

export const ImageList = (props) => (
    <List {...props}>
        <Datagrid>
            <ImageField/>
        </Datagrid>
    </List>
);

export const ImageNew = (props) => (
    <Create title="Upload a Image" {...props}>
        <SimpleForm>
            <ImageInput/>
        </SimpleForm>
    </Create>
)