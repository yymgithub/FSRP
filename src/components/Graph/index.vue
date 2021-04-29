<template>
  <div>
    <section>
      <div id="g6container">
        <GraphCard :cardData="cardData"></GraphCard>
      </div>
      <Model :visible="visible" :modelData="modelData" :afterVisibleChange="afterVisibleChange" :onClose="onClose"></Model>
    </section>
  </div>
</template>
<script>
import GraphCard from '@/components/GraphCard'
import Model from '@/components/Model'
import G6 from '@antv/g6'
// import * as echarts from 'echarts'
export default {
    name:'Graph',
    props: {
        api: String
    },
    components: {
        GraphCard,
        Model
    },
    created() {
    },
    mounted() {
        const container = document.getElementById('g6container');
        const width = container.scrollWidth;
        const height = container.scrollHeight || 500;
       // 初始化g6实例
        this.graph = new G6.Graph({
            container,
            width, // 宽
            height, // 高
            // fitView: true, // 是否适应画布
            maxZoom: 1,
            // minZoom: 0.5,
            // fitViewPadding: 10,
            modes: {
                default: ['drag-canvas', 'drag-node'], // 允许拖拽画布、拖拽节点'zoom-canvas','collapse-expand'
            },
            layout: {
                type: 'dagre', // 层次布局
                preventOverlap: true,
                rankdir: 'LR', // 由左向右
                nodesep: 15, // 节点水平间距
                ranksep: 65, // 层间距
            },
            // 默认节点配置
            defaultNode: {
                type: 'ellipse',
                size: [10, 5],
                // 标签文本配置
                labelCfg: {
                    positions: 'end',
                    refY: 10,
                    refX: 10,
                    style: {
                        fontSize: 15
                    }
                }
            },
            // 默认边配置
            defaultEdge: {
                size: 1,
                opacity: 0.6,
                color: 'grey',
                // 标签文本配置
                labelCfg: {
                    // 边上的标签文本根据边的方向旋转
                    autoRotate: true,
                    style: {
                        fontSize: 3
                    }
                }
            },
        });

        //获取数据初始化拓扑图
        this.getG6Data(this.api);

        // 监听node上面mouse事件显示tooltip
        this.graph.on('node:mouseenter', evt => {
            const { item } = evt;
            const model = item.getModel();
            const { x, y, info } = model;
            const point = this.graph.getCanvasByPoint(x, y);
            const { cpu, ram, read, write, up, down } = info;
            this.cardData = { cpu, ram, read, write, up, down, x, y };
        });

        // 节点上面触发mouseleave事件后隐藏card
        this.graph.on('node:mouseleave', () => {
            this.removeGraphCard();
        });

        // 左键单击节点
        this.graph.on('node:click', evt => {
          this.removeGraphCard();
          // 获取被点击的节点元素对象
          const { item } = evt;
          const model = item.getModel();
          const { label, info } = model;
          const { cpu, ram, read, write, up, down } = info;
          this.modelData = { cpu, ram, read, write, up, down, title: label };
          this.visible = true;
        });
    },
    data() {
        return {
          nodelist: {},
          cardData: {
            title: '暂无',
            cpu: '暂无',
            ram: '暂无',
            read: '暂无',
            write: '暂无',
            up: '暂无',
            down: '暂无',
            x: -10000,
            y: -10000
          },
          modelData: {
            title: '暂无',
            cpu: '暂无',
            ram: '暂无',
            read: '暂无',
            write: '暂无',
            up: '暂无',
            down: '暂无'
          },
          visible: false
        };
    },
    methods: {
      getNodeType(nodelist) {
          nodelist.forEach(node => {
            if (!node.style) {
                node.style = {};
            }
            node.style.lineWidth = 0.2;
            node.style.stroke = 'steelblue';
            node.style.fill = '#C6E5FF';
            node.type = 'ellipse';
            node.size = [35, 35];
            switch (node.mark) {
              case 0: {
                node.type = 'image';
                node.img = '/img/system.png';
                break;
              }
              case 1: {
                node.type = 'image';
                node.img = '/img/machine.png';
                break;
              }
              case 2: {
                node.type = 'image';
                if (node.fault === 1) {
                    node.img = '/img/master2.png';
                } else {
                    node.img = '/img/master.png';
                }
                break;
              }
              case 3: {
                node.type = 'image';
                if (node.fault === 1) {
                    node.img = '/img/slave2.png';
                } else {
                    node.img = '/img/slave.png';
                }
                break;
              }
              case 4: {
                node.type = 'image';
                if (node.fault === 1) {
                    node.img = '/img/node2.png';
                } else {
                    node.img = '/img/node.png';
                }
                break;
              }
              default: {
                node.type = 'image';
                if (node.fault === 1) {
                    node.img = '/img/resman2.png';
                } else {
                    node.img = '/img/resman.png';
                }
                break
              }
            }
        });
      },
      getG6Data(api) {
          this.$http.get(api).then((res) => {
           if (res.data.code === 200) {
            this.nodelist = res.data.data;
            const remoteData = this.nodelist;
            const nodes = remoteData.nodes;
            this.getNodeType(nodes);
            this.graph.data(remoteData);
            this.graph.render();
            const group = this.graph.get('group');
            const box = group.getCanvasBBox();
            const container = document.getElementById('g6container');
            const width = container.scrollWidth;
            container.style.height = box.height + 50;
            this.graph.changeSize(width, box.height + 50);
            this.graph.render();
          }
        })   
      },
      // 取消GraphCard
      removeGraphCard() {
        this.cardData = {
          title: '暂无',
          cpu: '暂无',
          ram: '暂无',
          read: '暂无',
          write: '暂无',
          up: '暂无',
          down: '暂无',
          x: -10000,
          y: -10000
        }
      },
      afterVisibleChange() {
        console.log('动画回调')
      },
      onClose() {
        this.visible = false;
        console.log('关闭回调')
      }
    }
}
</script>
<style lang="less" scoped>
#g6container {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>