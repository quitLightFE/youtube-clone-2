import { Box } from "@mui/material";
import React, { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }
  componentDidCatch(error) {
    console.log(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box display={"flex"} justifyContent={"center"} color={"error.main"}>
          Xatolik yuz berdi
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
