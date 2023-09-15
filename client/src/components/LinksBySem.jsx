import { Container, IconButton, InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ViewDocumentIcon from "@mui/icons-material/OpenInNew"
import { useSelector } from 'react-redux'

const LinksBySem = ({ links, semester }) => {
    const [linksBySemester, setLinksBySemester] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const mode = useSelector((state) => state.app.mode);

    useEffect(() => {
        const sortedLinks = links?.filter((link) => link.semester === semester);
        setLinksBySemester(sortedLinks);
    }, [semester, links])

    // Code snippet from index.jsx

    const filteredLinks = linksBySemester.filter(link =>
        link.linkName.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant='h3' fontWeight={600} mb={3}>Links for Textbooks and Resources</Typography>
            <InputLabel id="search-label" sx={{ display: "flex", justifyContent: "flex-start", width: "100%", fontWeight: 600 }} >Search for Link:</InputLabel>

            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
            />

            {filteredLinks.length === 0 ? (
                <Typography
                    variant="body1"
                    fontSize={"18px"}
                    color="textSecondary"
                    sx={{
                        backgroundColor: mode === "light" ? "wheat" : "rgb(0,0,0,0.5)",
                        borderRadius: "10px",
                        width: "fit-content",
                        padding: "10px"
                    }}
                >
                    No links found.
                </Typography>
            ) : (
                <List>
                    {filteredLinks.map((link, index) => (
                        <ListItem key={index} sx={{ mb: 1, bgcolor: mode === "light" ? "wheat" : "rgb(0,0,0,0.5)", borderRadius: "10px", display: "list-item" }}>
                            <ListItemText primary={link.linkName} secondary={link.linkAddress}
                                primaryTypographyProps={{ noWrap: true }}
                                secondaryTypographyProps={{ noWrap: true, component: 'div' }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => window.open(link.linkAddress, "_blank")}>
                                    <ViewDocumentIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>

            )}

        </Container>
    )
}

export default LinksBySem