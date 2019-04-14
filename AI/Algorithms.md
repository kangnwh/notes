# 算法

| Short Name                        | Comment 1                                                    | Comment 2                                                    |
| --------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| STRIPTs                           | ![image-20181105092440322](assets/image-20181105092440322.png)<br />![image-20181105092457653](assets/image-20181105092457653.png) |                                                              |
| BrFS(BFS)                         | Breadth-first-search                                         | - Completeness<br />- Optimality(if costs are uniform)       |
| DFS                               | Deep-first-search                                            | - Not completeness<br />- Not optimality                     |
| ID                                | Iterative Depening                                           | - Completeness<br />- Optimality                             |
| GBFS                              | Greedy Best-First Search                                     |                                                              |
| BFWS                              | Best-First Width Search                                      |                                                              |
| $h^*$                             |                                                              | - Optimal one (theoretical)                                  |
| $h^+$                             | ![image-20181101144542289](assets/image-20181101144542289.png) | Safe, Admissible (drop deletion)                             |
| $h^{add}$                         | ![image-20181101145014944](assets/image-20181101145014944.png) | Safe, not admissible (based on $h^+$)                        |
| $h^{max}$                         | ![image-20181101145043606](assets/image-20181101145043606.png) | Safe, admissible (based on $h^+$)                            |
| $IW(k)$                           | - if  $novetly(s) > k$, then prune                           | - try to solve problem first in $IW(1)$, if not solved, then $IW(2)$, ...<br />- **novetly:** smallest subset of atoms (which is first showing up) size of the new state<br /> |
| MDP                               | ![image-20181102101208526](assets/image-20181102101208526.png)<br />**Or**<br />![image-20181102101425470](assets/image-20181102101425470.png)<br />![image-20181102101433642](assets/image-20181102101433642.png) | **fully** observable, **probabilistic** state models<br /><br />![image-20181101100803418](assets/image-20181101100803418.png)<br />- **value iteration:**(update value via last iteration value) <br />![image-20181102102143296](assets/image-20181102102143296.png)<br />- **policy iteration:**(update policy via existing policy)<br />![image-20181102111405872](assets/image-20181102111405872.png) |
| MCTs                              |                                                              |                                                              |
| UCT                               | ![image-20181102151047562](assets/image-20181102151047562.png) |                                                              |
| Q-Learning                        | ![image-20181104111846764](assets/image-20181104111846764.png)<br />off-policy<br />optimistic<br />unsafe<br/>or risky |                                                              |
| SARSA                             | ![image-20181104112910413](assets/image-20181104112910413.png)<br />safe |                                                              |
| n-step SARSA                      | ![image-20181104114018787](assets/image-20181104114018787.png) |                                                              |
| Nash Equation                     |                                                              |                                                              |
| Mix strategies:<br />Indifferency | ![image-20181104212731163](assets/image-20181104212731163.png) | - think of $A$ and $B$, the indifferency for $A$ is that the probability $X$ of selecting action $a$ that makes $B$ have the same reward. |



## Reinforcement Learning Cons

![image-20181104113339990](assets/image-20181104113339990.png)





















