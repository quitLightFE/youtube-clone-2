import { render, screen } from "@testing-library/react";
import VideoCard from "../components/VideoCard";
import { MemoryRouter } from "react-router-dom";

const data = {
  id: "1",
  title: "MUI Layouts and Theming",
  channelId: "c7",
  views: 58200,
  date: "2025-12-09",
  thumbnail: "https://i.ytimg.com/vi/o1chMISeTC0/hqdefault.jpg",
  videoUrl: "https://www.youtube.com/embed/o1chMISeTC0",
};

describe("VideoCard", () => {
  test("VideoCard render tekshirish", () => {
    render(
      <MemoryRouter>
        <VideoCard data={data} />
      </MemoryRouter>
    );
    const cardTitle = screen.getByText(/MUI Layouts and Theming/i);
    const img = screen.getByRole("img");
    expect(cardTitle).toBeInTheDocument();
    expect(img).toHaveAttribute("style");
  });
});

describe("VideoCard Snapshot", () => {
  test("snapshot test", () => {
    const { container } = render(
      <MemoryRouter>
        <VideoCard data={data} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
