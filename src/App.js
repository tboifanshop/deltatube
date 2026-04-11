import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { ChannelDetail, Feed, Navbar, SearchFeed, VideoDetail } from "./components";
import DancingCorner from "./components/ui/DancingCorner";

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Box sx={{ backgroundColor: '#000'}}>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Feed />}/>
        <Route path="/video/:id" element={<VideoDetail />}/>
        <Route path="/channel/:id" element={<ChannelDetail />}/>
        <Route path="/search/:searchTerm" element={<SearchFeed />}/>
      </Routes>
      <DancingCorner />
    </Box>
  </BrowserRouter>
);

export default App
