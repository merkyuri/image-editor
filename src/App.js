import React, { createRef, useEffect } from "react";
import styled from "styled-components";

import MoveButton from "./components/MoveButton";
import RotationButton from "./components/RotationButton";
import SizeButton from "./components/SizeButton";
import CropButton from "./components/CropButton";
import SubmitButton from "./components/SubmitButton";

function App() {
  let canvas;
  let canvasRef = createRef();
  let pos = {
    drawable: false,
    x: -1,
    y: -1,
  };
  let ctx;

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", initDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", finishDraw);
    canvas.addEventListener("mouseout", finishDraw);
  }, []);

  function initDraw(event) {
    ctx.beginPath();
    pos = { drawable: true, ...getPosition(event) };
    ctx.moveTo(pos.X, pos.Y);
  }

  function draw(event) {
    if (pos.drawable) {
      pos = { ...pos, ...getPosition(event) };
      ctx.lineTo(pos.X, pos.Y);
      ctx.stroke();
    }
  }

  function finishDraw() {
    pos = { drawable: false, X: -1, Y: -1 };
  }

  function getPosition(event) {
    return { X: event.offsetX, Y: event.offsetY };
  }

  return (
    <>
      <Container>
        <MoveButton />
        <RotationButton />
        <SizeButton />
        <CropButton />
        <SubmitButton />
        <canvas ref={canvasRef} width="400" height={"300"} />
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: grey;
`;

export default App;
