# Game of Life

> Game of Life


## Description

### Life Rules

> 每个细胞迭代后的状态由该细胞及周围8个细胞状态所决定。

- 当前细胞为死亡状态时，当周围有3个存活细胞时，则迭代后该细胞变成存活状态(模拟繁殖)。
- 当前细胞为存活状态时，当周围的邻居细胞低于两个(不包含两个)存活时，该细胞变成死亡状态(模拟生命数量稀少)。
- 当前细胞为存活状态时，当周围有两个或3个存活细胞时，该细胞保持原样。
- 当前细胞为存活状态时，当周围有3个以上的存活细胞时，该细胞变成死亡状态(模拟生命数量过多)。

## License

[MIT](./LICENSE) License © 2022-Present [JiatLn](https://github.com/JiatLn)
