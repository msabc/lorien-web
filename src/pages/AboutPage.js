import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import * as React from 'react';

export default function AboutPage() {
    return (
        <Container>
            <Typography align="center" variant="h2" gutterBottom>
                About
            </Typography>
            <Typography align="center" variant="h5" gutterBottom>
                wowzerinjo
            </Typography>
        </Container>
    )
}