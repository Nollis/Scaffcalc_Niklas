# Scaffcalc - Full Stack Developer - Use Case

Welcome to the Scaffcalc Full Stack Developer use case repository. This repository contains a comprehensive demonstration of a web application built with React and a mocked API server.

## Overview

This repository includes two primary components:

1. **React Project**: A react web application generated with CRA typescript template. It includes the following main dependencies: [three](https://threejs.org/docs/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei) and [msw](https://mswjs.io/). The application consists of a full-screen 3D Scene that contains houses, a single [pivot-control](https://github.com/pmndrs/drei?tab=readme-ov-file#pivotcontrols) component and a overlayed button. A house is represented by four local points, height, world-position and -rotation. Clicking on a house point will display the pivot-controls. Clicking on the overlayed button shall make a GET request to a predefined endpoint that will fetch a new list of houses.

2. **Mocked API Server**: A simulated backend server (with msw) that provides a predefined endpoint for the React application. This allows for a "realistic" full stack development experience without the need for a live backend service.

## Objectives

There are four objectives for this use case:

1. Implement the pivot-controls logic for translation and rotation of a house (not modifying the house shape). A user shall be able to translate (move) and rotate any house by interacting with the pivot-controls. There are available states and callbacks in the source code that can be used but feel free to change it however you like. A hard requirement is that there shall only be a single pivot-controls component in the scene.
2. Implement a mocked GET response generator for the following endpoint `https://scaffcalc.com/api/houses` (see function getHousesGenerator() in src/mocks/endpoints.ts).
   The requirements for the generator are:
   - Generate a random number of houses (from 1-10).
   - Each generated house shall have a random shape, consisting of the four points. Ensuring convexity of the shape is a plus.
   - Each generated house shall have a randomized position but y-axis always be 0m and x/z-axis within grid limits (100x100m).
   - Each generated house shall have a randomized rotation in y-axis.
   - Each generated house shall have a randomized height (maximum 20m).
3. Implement the overlayed button onClick callback so it fetches new houses from the mocked API and then displays them in the scene. Objective 1 shall still apply to the fetched houses.
4. Display the current houses state (however you like i.e list, grid or table) to the left of the scene.

## Get Started

1. Install the dependencies with: `yarn`
2. Start the react development server with: `yarn start`
3. Make any changes you want to the source code and don't forget to commit/push your changes with git.
4. Move on with the next objective if you get stuck.
5. Don't hesitate to ask for help if needed (saudin@scaffcalc.com)

## Time frame and reporting

You have a maximum of three days to report your results after you have received a invite for this use case. You report that you have finished the case by emailing Saudin (saudin@scaffcalc.com). We will consider many things when we evaluate your case but some are: code-readability, -performance and -structure. We will schedule a online or physical follow-up meeting where we will ask you to go through your case and have a discussion about it.
