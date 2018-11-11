#   Mobile

[TOC]





- Mobile User Interfaces
- Mobile Games
- Sensors and Hardwares
- Location Privacy
- RFID
- Wireless sensor networks and mobile networks



## Overview

### Applications

- Digital purchases
- Mobile shopping
- Mobile advertising
- Information Management
  - access to information everywhere (stock, weather, news,...)

- Location-based services
  - connext-aware applications
- Mobile data management



### Futures

- Mobile banking
  - already on the go
  - Payments (digital cash, WeChat Pay, Alipay)
- Speech recognition
- Barcode reader (QR)
- Increase range of wireless services
  - WiMax
  - Peer to peer phones
- Integration with sensors
  - GPS, accelerometer, temperature,...
- Overcome limitations in screen size





### Operating Systems

- Symbian
- Windows Mobile
- Linux
- Palm OS (Dead now)
-  RIM (BlackBerry)
- Android 
  - Not an OS but a software stack that uses Linux
  - Dalvik virtual machine (Java)
  - WebKit (open source)
- iPhone OS



## Technologies

### Physical

- WPAN (Bluetooth)
- WLAN
- WAN
- RFID
- GPS
- Routing in MANETs
- Mobile IP



## Computing Paradigm

### Developing Software

#### [++] Web vs Native

| Web                                                          | Native                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Create a web Service                                         | Develop application via SDK                                  |
| Client (include mobile device) access services via web browser | Deploy the app locally on a device and access services via apps |
| One code for all platforms                                   | Each platform must be cared separately                       |
| Responsible Web Design(响应式设计)                           |                                                              |
| 适用于:<br />- 时间紧迫, 需要短时间内跨平台<br />- budget少的<br />- 互动不复杂的 | 适用于:<br />- 对性能要求高的<br />- 使用很多sensors的       |



#### Design with all platforms considered

- High-level APIs
- Use platform-independent low-level APIs
- Responsiveness: Discover device capacities



## [+++] UI Design and UX (User eXperience)

### Principles

- KISS: keep it simple and stupid
  - simple and easy-to-use UI
  - Minimise user input
  - pre-selected likely choice
- Metaphors and skeuomorphism
  - 拟物风 
- Material Design
- Use side drawers  

 #### Tips

- Use side drawers (think off canvas)
- Springboards
- Card deck metaphor 
- Dashboard





### Design Cycle (steps)

#### 7 Stages of Action

1. Find the goal
2. From goal to execution
3. (User) Evaluation the design
4. Improvement

![image-20181108222930827](assets/image-20181108222930827.png)

 

##### Gulf (gap?) of Execution (执行偏差)

> 使用者规划的行动和系统所接受的不一致

- the difference between the intentions and the allowable actions
- how directly can the actions be accomplished
- Do the actions that can be taken in the system match the actions intended by the person

###### 如何判断是不是好的Execution设计

> - user can tell what actions are possible
> - interface can help user map intention to physical movement
> - device can desily support required actions



##### Gulf (gap?) of Evaluation (评估偏差)

> 系统表现和使用者期待之间的差距

- workload to **interpret** the state of the system
- is the information easily accessible
- mismatch between the exception of users and the behovior of systems

###### 如何判断是不是好的evaluation

> - user can easily tell if the system is in the desired state
> - user can map the system state to an interpretation
> - user can easily tell what state the system is in



### UI Elements

Button, Stepper, Switch, Segmented, Checkbox, Popup Menu, (date) picker, UITextField, UITableView, UICollectionView, UILabel, UIImage



#### Text Input

- 12/9 buttons, QWERT keyboards, pen, voice, special hardwares
- Smart Watches: ZoomBoard, TouchOne, Touch-Sensitive Wristbands, Omnitouch



 

### [++]  Usability

| Name         | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| Learnability | how easy for a user to learn                                 |
| Efficiency   | how quick can user perform a task                            |
| Memorability | how easy for a user to reuse it after quite a period of time |
| Errors       | how to serve errors and how easy can user recover from errors |
| Satisfaction | how pleasant is it for user to user this design              |

#### Key points

##### Meet expectation:

- match between system and the real world
- Help and documentation
- Consistency and standards

##### User is the boss

- User control and freedom (makes people feel the control, like loading icons)
- Visibility of system status
- Flexibility and efficiency of use

##### Handle errors

- Error prevention
- Recognition rather than recall
- Help user recognize, diagnose and recover from errors

##### Keep is simple (and stupid, KISS)

- Aesthetic and minimalist design (beautiful and simple design)







## Game development Process

### Classification Methods

- Cooperation
- Sum of choice
  - Zero-sum/non-zero sum
- Simultaneous/Sequential (Turn-based)
- Information
  - Perfect (All known)
  - Imperfect

- By View(First-Person, Third-Person, side scroller)
- By Type (Action, Adventure, Puzzle)
- By genre(Fantasy, sport)



### 5 planes(factors) for a game

- rule-based
- medicated
- fictional
- play
- social

![image-20181108112944924](assets/image-20181108112944924.png)

### Game Design

```mermaid
graph LR
A(Designer) --> B(Context)
B --> C(Player)
C --> D(Meanings)

```

#### Factors of a Game

| Factors       |                                                              |      |
| ------------- | ------------------------------------------------------------ | ---- |
| Semiotic      | A symbol or icon that represents sth (objects, players, npcs) |      |
| System        | - **Objects**: parts/elements/variables that within the system<br />- **Attributes**: qualities or properties of the system or its objects<br />- **Internal** Relationships: relations between objects<br />- **Environment**: context that surrounds the system |      |
| Interactivity | - **Cognitive**: interpretive participation<br />- **Founctional**: utilitarian participation<br />- **Explicit**: participation with designed choices and procedures<br />- **Beyond-the-object**: participation within the culture of the project |      |
| **Choices**   | - at micro level: each decision at its smallest level<br />- at macro level: aggregated choices form a larger outcome<br />- tactic (local planning): a cluster of choices<br />- strategy (global planning): a sum of players' choices<br />- outcomes depends on actions of the others (like your opponents) |      |



##### Implementing choices

- choice must have consequences (reflect for users' score or sth)
- avoid dominant choice
- cannot go back after consequences are applied

###### Importance of choices:

- critical: life or death
- important: direct or immedicate impact
- necessary: indriect or delayed impact
- minor: small impact (can be direct or indirect)
- without consequence



 ### Frameworks

#### MDA (Mechanices, Dynamics, Aesthetics)

- **Mechanics**: Rules and algorithms define the actions 

- **Dynamics**: Behaviour arising while players interact 

- **Aesthetics**: Experiences, emotions 



### Player analysis

#### Player type (Bartle’s Taxonomy of Player Type)

![image-20181109165259604](assets/image-20181109165259604.png)



### Game design criticals

|              |                                                              |      |
| ------------ | ------------------------------------------------------------ | ---- |
| GDD          | Game Design Document                                         |      |
| Expectations | What Players want and they do not                            |      |
| Experience   | Find an idea of a game with a meanful plot to convey an experience:<br />- **idea**: goals, constaints,Rules, rewards, styles, ...<br />- **meanful**: Location, age, world, universe<br />- **plot**: Comedy, overcoming a master, Romance, ...<br />- **convey**: impression, reaction, feedback |      |



#### [+?] The polt

- Experience should not be linear
- 情节循序渐进, 高潮迭起, 刺激不断

#### The flow

- 难易结合, 有难的篇章/操作,也有白痴/简单的篇章/操作

> flow of the game should be traded off between challenges and skills (of players)
>
> eg: (the white road is "**flow channel**")
>
> | Distractions, no flow                                        | Flow, but too linear "run"                                   | Most interesting flow                                        |
> | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
> | ![image-20181109204321515](assets/image-20181109204321515.png) | ![image-20181109204312953](assets/image-20181109204312953.png) | ![image-20181109204303127](assets/image-20181109204303127.png) |
>
>

- Clear goals
- No distractions
- Direct feedback
- Continuously challenge



### Rules & Goals

略



### Aesthetics

| Factors         | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| Style Guide     |                                                              |
| Curves & Ratios | - Fibonacci Curves<br/>- Golden Ratio<br />- Golden Angle<br />- Voronoi Cells<br />- Fractals, L-Systems<br />- Flow Simulations |
| **Colors**      | - Moodboards (mood board是指经由对使用对象与产品认知的色彩，影像，数字资产或其它材料的收集，可以引起某些情绪反应，作为设计方向与形式的参考。设计师运用它来检视色彩，样式，并据以说服其它人之所以如此设计的理由。其应用范围很广，可以用于接口设计，网页设计，品牌设计，营销沟通，电影制作，脚本设计，电玩游戏制作，甚至是绘图，室内设计等等。) |





### Realism

##### Problem: Uncanny Valley

人类(玩家)对机器人(游戏人物)在"拟人"水平达到100%之前的一小段时间突然产生强烈的厌烦.

> | Definition                                                   | Figure                                                       |
> | ------------------------------------------------------------ | ------------------------------------------------------------ |
> | 恐怖谷現象可以用以下想法解释，如果一個实体「不够拟人」，那它的类人特征就會显眼并且容易辨认，产生移情作用。在另一方面，要是一個实体「足够拟人」，那它的非类人特征就會成为显眼的部份，在人类观察者眼中产生一种古怪的感觉. | ![image-20181108114028866](assets/image-20181108114028866.png) |



### Game Technologies





#### Game Loop

![image-20181108114137023](assets/image-20181108114137023.png)



#### Game API

| Element                | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| GameCanvas             | ▪ Dedicated screen buffer (Graphics object)<br/>▪ Supports incremental updates (instead of rendering entire frame)<br />▪ Flush graphics: display contents of the buffer |
| Layers                 | ▪ Sprites and tiled layers<br/>▪ Can be visible or invisible |
| Screen Buffer & Layers |                                                              |
| Sprites                | A set of tiles is small; little memory required              |



#### Collision Detection

- Boundary-level (fast, like using a rectangle to represent a  sprite)
- Pixel-levle (precise but resource-consumption)



#### Features of mobile games

| Features             | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| Processing & Network | Less CPU power, (usually) no hardward acceleration, less memory, unstable networks |
| Hardware             | Input capabilities, screen size<br />- touch screen: feedback, adjustable |
| Portabality          | **Sensors**: location, acceleration, camers<br />**Context-awareness**: use environment as part of the game (AR)<br />**Device as controller**<br />Mixed reality games, location-based games |



#### Augmented Reality (AR)

- Mixed Reality(MR)

> ![image-20181110111426867](assets/image-20181110111426867.png)



## Sensors 

| Types                   |                                                              |                                                              |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Wearable Computing      |                                                              |                                                              |
| AR vs VR                |                                                              |                                                              |
| Internet of Things      | - Reliable and effective for IoT (No)<br />- Data privacy is an important problem (access easily granted, ) | - Lightweight protocols<br />- Network discovery<br />- Scalability<br />- Naming and addressing strategies<br />- Dynamic routing |
| **Sensors**             | In the broadest definition, a sensor is a **device, module, or subsystem** whose purpose is to **detect events or changes** in its environment and **send the information to other electronics**, frequently a computer processor. | ![image-20181108134836350](assets/image-20181108134836350.png)<br />Camera, GPS, Accelerometer, Fingerprint, Ambient light sensor, Magnetometer, Microphone, Barometer |
| Context-Aware Computing | Such context-aware software adapts according to thelocation of use, the collection of nearby people, hosts, and accessible devices, as well as to changes to such things over time. | Eg: <br />- An accelerometer to detect whether you are in a train, bus or car and do some task relevantly<br />- light sensor (to adjust the light of the device itself)<br />- Accelerometer for layout change(landscape or ...) |









## Location-based Services(LBS) & Location Privacy

**Definition: Services that integrate a mobile’s device location with other information** 



### Push vs. Pull

- **Push**: User receives information without an active request
- **Pull**: User actively pulls information from the network 



### Location Accuracy Level of Applications

| Accuracy Level          | Applications                                                 |
| ----------------------- | ------------------------------------------------------------ |
| High Accuracy           | - Asset tracking<br />- Directions<br />- Emergency          |
| Medium to high accuracy | - Advertising<br />- Car navigation<br />- POI (point of interest) |
| Low accuracy            | - Fleet management<br />- News<br />- Traffic Information    |



### Location Engine

- Geocoding (translate street address to latitude & longitude or vice versa)
  - could be difficult if not complete information available
- Routing & Navigation
  - Compute best route: A*, Dijkstra...
  - Best could mean: shortest, fasterst, simplest,...
- Proximity search
  - Spatial DBs: POIs such as ATMs, hotels, gas stations,...



### Location Privacy

- Location-based spam (email, ads)
  - Unsolicited advertising (Fackbook konws where you were !)
- Personal safety (celebrities positions were made public)
  - Stalking
  - Assault

- Intrusive inferences
  - Person's political views
  - Individual perferences
  - Health conditions



#### Sharing - Location obfuscate

##### Imperfect 

- Types:

> ![image-20181111105501604](assets/image-20181111105501604.png)







#### [++] How to protect your location privacy

| Method        | Description                                                  | Comment                                                      |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Stealth       | Ability to be at a location without anyone knowing you are there (Use of passive devices such as GPS) | - Active devices such as mobile phones cannot preserve stealth  <br />- Access of information overrides stealth |
| K-Anonymity   | https://www.zhihu.com/question/26710204<br />(k-anonymity指的是除非有k-1个人的数据同时被公布，才可能推断出第k个人是谁) | - quasi identifier                                           |
| Cloaking      | - 降低精度<br />- Reduce the frequency of temporal information<br />![image-20181111103537813](assets/image-20181111103537813.png) | - split people in the system, until we have ***k*** persons in an area and use that location to represent you (这样的话, 只有同时识别k-1个人是谁, 才能分辨出来你是哪个) |
| L-Diversity   | - persons with same non-sensitive fields combination have different sensitive fields (增加数据的丰度,使得具有相同分类的non-sensitive出现尽可能多种类的sensitive) |                                                              |
| Decentralised | - limitations of centralised: communication overhead, security risks, single point of failure<br />- LCA: locally cloaked area<br />- GCA: globally cloaked area<br /> | See detail below                                             |
| *k-GNN*       | - find the place that sum the distances to all users of a group<br />- **distance intersection attack**: if someone knows the distances from one user to 3+ places, then the accurate location of that user can be calculated out.(use aggregate information) | ![image-20181111142243789](assets/image-20181111142243789.png) |



##### Decentralised

**Principle:** 

1. initiator: create request and encrypt request via public key (**using LCA to hide the precious location of itself**)
2. agent: initiator sends request to agent, agent sends it to LBS provider (**using GCA to decrease precious location of itself)**
3. LBS provider(eg, google): dencrypts the request and encrypts response via initiator's public key, and sends it to agent
4. agent sends responses to all devices of an area
5. only initiator can read the response (as only initiator has the private key to dencrypt the response)

|                       |                        |                                                              |
| --------------------- | ---------------------- | ------------------------------------------------------------ |
| LCA                   | locally cloaked area   | - Parameter affecting ratio of length and width<br />- Parameter for the agent’s position relative to area’s boundary |
| GCA                   | Globally Cloaked Area  | Find the minimum bounding box of a k-subset (including the agent’s own LCA) from n possible LCAs<br />![image-20181111134318289](assets/image-20181111134318289.png)<br />- Green area is the LCA of the user<br />- Dot black rectangle is the GCA |
| Approximating the GCA |                        | - Red rectangle is the LCA<br />- Whole grey area is different GCA stages<br />1. find the edge that has the max distance to the LCA edges![image-20181111134545887](assets/image-20181111134545887.png)<br />2. remove the rectangles which have the edges that selected from step 1<br />3. Find the GCA that can cover all left LCAs (white area as below).<br />![image-20181111134901785](assets/image-20181111134901785.png) |
| Random selection      | How to select an agent | - Initiator selects one device A<br />- Device A selects one device B<br />- B actually sends the request |



##### Whole step



![image-20181111140334056](assets/image-20181111140334056.png)

 

#### Location attacks

| Attack Type                           | Description                                                  |                                                              |
| ------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Query Sampling Attack                 | Can easily find a user (eg, A) from several different regions' user set information | (User A can be easily outleted)![image-20181111142920224](assets/image-20181111142920224.png) |
| Query Tracking Attack                 | - Assumptions: continuous queries, some unchanged identity key <br />- Track the path of a user, which may be used to find out the destination of that user (using intersection) | ![image-20181111143533874](assets/image-20181111143533874.png) |
| Maximum Movement Boundary(MMB) Attack | - Assumptions: continuous queries, unchanged identity key between two consecutive queries<br />- Can be used to fidn the approximate location of that user | ![image-20181111143932800](assets/image-20181111143932800.png) |



## RFID

*





## Networks

### [++]Digital Networks

- Efficiency
- Security



### [++]Signal Propagation

- Transmission Range



### [++]Multiplexing

-  



### Bluetooth





### ZigBee



### AOVD



### [+++] Routing





## Challenages



### (Wireless) Communication 

- More frequent disconnections
- Lower bandwidth
- Higher Latency
- Variation in available bandwidth
- Complex network typology 
- Increased risk



![image-20181108105535516](assets/image-20181108105535516.png)



### Mobility

- Address Migration
  - Mobile divices use different (IP) address
  - Selective broadcast, central services, home base, forwarding pointers
- Location Dependent Information
  - Information request depends on the location of devices
- Migration Locality
  - Connections should be automatically migrated to a closer server (geographically) 



### Portability

- Energy

  - Batteries - ~= 20% weights of a mobile device
  - Power consumption ~= $CV^2F$
    - $C$: capacitance can be reduced by **VLSI (??)** design
    - $V$: can be reduced by smaller structure
    - $F$: clock frequency

- Risk to data

  - easier to loos or damage in mobile devices

- Resource-poor related to static devices that have the same budget




### Social Impact

- Privacy
- Security
- Behavior

























