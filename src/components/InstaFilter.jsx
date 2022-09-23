import React, { useContext } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { filterValues } from '../utils';
import { FilterContext } from '../App';

const InstaFilter = () => {
    const { filterClass, setFilterClass } = useContext(FilterContext);

    const handleChange = (e) => setFilterClass(e.target.value);

    return (
        <Box sx={{ maxWidth: 300 }}>
            <FormControl fullWidth>
                <InputLabel>Filter</InputLabel>
                <Select
                    value={filterClass}
                    label="Filter"
                    onChange={handleChange}
                >
                    {filterValues.map((filterVal) => (
                        <MenuItem value={filterVal.class} key={filterVal.class}>
                            {filterVal.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default InstaFilter;
