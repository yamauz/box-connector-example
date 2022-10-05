import type { NextPage } from "next";
import Head from "next/head";

import Connector from "react-svg-connector";

// if you want to use core connector components
import {
  SConnector,
  LineConnector,
  NarrowSConnector,
} from "react-svg-connector";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const [sliderValue, setSliderValue] = useState(500);
  const [activeDrags, setActiveDrags] = useState(0);
  const [redraw, setRedraw] = useState(0);
  const refs = useRef<{ [key: string]: any }>({});

  function addRef(key: string) {
    if (refs.current[key]) {
      return refs.current[key];
    } else {
      const newRef = React.createRef<any>();
      refs.current[key] = newRef;
      return newRef;
    }
  }

  function onStart() {
    const newActiveDrags = activeDrags + 1;
    setActiveDrags(newActiveDrags);
  }

  function onStop() {
    const newActiveDrags = activeDrags - 1;
    setActiveDrags(newActiveDrags);
  }

  function onDrag(e: any, data: any) {
    setRedraw(Math.random());
  }

  useEffect(() => {
    setRedraw(Math.random());
  }, [sliderValue, redraw]);

  return (
    <Box>
      <Slider
        aria-label="slider-ex-1"
        defaultValue={sliderValue}
        min={100}
        max={1000}
        colorScheme="teal"
        onChange={(v) => setSliderValue(v)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Box h="100vh" w={`${sliderValue}px`}>
        <Accordion
          allowMultiple
          onChange={() => {
            setRedraw(Math.random());
          }}
        >
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Section 1 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel m="0" p="0">
              <Connector
                el1={refs.current["box1"]?.current}
                el2={refs.current["box2"]?.current}
                shape="narrow-s"
                direction="r2l"
                endArrow={true}
                stem={30}
                minStep={100}
                roundCorner={true}
              />
              <Connector
                el1={refs.current["box2"]?.current}
                el2={refs.current["box3"]?.current}
                shape="narrow-s"
                direction="r2l"
                endArrow={true}
                stem={30}
                minStep={100}
                roundCorner={true}
              />
              <Wrap w="full" spacing="40px" h="400px" py="5" pl="20">
                <WrapItem>
                  <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
                    <Box h="50px" w="100px" bg="tomato" ref={addRef("box1")} />
                  </Draggable>
                </WrapItem>
                <WrapItem>
                  <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
                    <Box h="50px" w="200px" bg="green" ref={addRef("box2")} />
                  </Draggable>
                </WrapItem>
                <WrapItem>
                  <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
                    <Box h="50px" w="100px" bg="pink" ref={addRef("box3")} />
                  </Draggable>
                </WrapItem>
              </Wrap>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Home;
