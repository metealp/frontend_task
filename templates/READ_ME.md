# Instructions
------------

1. Create a virtualenv:
```sh
python3 -m venv venv
```

2. Activate it:
```sh
    cd venv/Scripts/
    activate
    cd .. && cd ..
``` 

3. Install the requirements:
```sh
    pip install -r requirements.txt
``` 

4. Run the application:
```sh
    python3 -m main
```

# Description
------------

## Introduction
Thank you for giving me the opportunity to prove myself.

## Assumptions
After reading description and examining data, the change in class label considered as a shift from a control group to test group, or defected batch in a production line.

## Used Libraries & Choices
Besides HighCharts that is mentioned in task description as a preferable chart library, a few Semantic UI components are used for navigating, grouping and showing loading state. Considering the scope of work, utility libraries such as jQuery are avoided to keep bundle size minimum.

## Strengths & Tradeoffs
Choosing plain JavaScript for DOM manipulation and other utilities helped to keep the bundle size noteworthily low and make application fast. Well structured and clean code provides easy adaptation for future crew members. On the dark side, time is traded for low bundle size and simplicity. Another trade was using classes in `Sensor.js` which led a compatibility issue with the IE11 browser.
                
## Possible Improvements
Having direct feedback from the engineers and/or scientists who will daily use the interface and understanding their needs and priorities would improve the application's functionality. In addition to having feedback stakeholders, providing live data flow via a WebSocket might help decision-makers to immediately respond unexpected readings. Another possible improvement is reusability of the functions which had low priority due to pressure of the deadline and current work load.


**Free Software, Hell Yeah!**