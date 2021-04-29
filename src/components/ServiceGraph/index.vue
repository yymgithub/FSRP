<template>
  <div>
    <section>
        <div id="section">
            <div id="g6Service">
            </div>
            <ServiceCard :serviceData="serviceData" :ifCard="ifCard"></ServiceCard>
        </div>
    </section>
  </div>
</template>
<script>
import ServiceCard from '@/components/ServiceCard'
import G6 from '@antv/g6'
// import * as echarts from 'echarts'
export default {
    name:'ServiceGraph',
    props: {
        api: String
    },
    components: {
        ServiceCard
    },
    created() {
    },
    mounted() {
        const container = document.getElementById('g6Service');
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
                nodesep: 10, // 节点水平间距
                ranksep: 40, // 层间距
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
            const { data } = model;
            const { name, machine, containner, alldelay, servicedelay, usetime, error, servicetype } = data;
            this.serviceData = { machine, containner, alldelay, servicedelay, usetime, error, servicetype, name};
            this.ifCard = true;
        });

        // 节点上面触发mouseleave事件后隐藏card
        this.graph.on('node:mouseleave', () => {
            // this.removeGraphCard();
            // this.ifCard = false;
        });

        // 左键单击节点
        this.graph.on('node:click', evt => {
          // 获取被点击的节点元素对象
          const { item } = evt;
          const model = item.getModel();
          const { id } = model;
          document.getElementById('serviceInfo').scrollIntoView();
          this.$emit('getNodeId', id);
        });
    },
    data() {
        return {
          ifCard: false,
          nodelist: {},
          serviceData: {
            x: -10000,
            y: -10000,
            name: '暂无',
            machine: '暂无',
            containner: '暂无',
            alldelay: '暂无',
            servicedelay: '暂无',
            usetime: '暂无',
            error: '暂无',
            servicetype: '暂无'
          }
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
            node.size = [25, 25];
            switch (node.data.health_level) {
              case 0: {
                node.type = 'image';
                node.img = '/img/service.png';
                break;
              }
              case 1: {
                node.type = 'image';
                node.img = '/img/service2.png';
                break;
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
            const container = document.getElementById('g6Service');
            const width = container.scrollWidth;
            container.style.height = box.height + 50;
            this.graph.changeSize(width, box.height + 50);
            this.graph.render();
          }
        })   
      },
      // 取消GraphCard
      removeGraphCard() {
        this.serviceData = {
            name: '暂无',
            machine: '暂无',
            containner: '暂无',
            alldelay: '暂无',
            servicedelay: '暂无',
            usetime: '暂无',
            error: '暂无',
            type: '暂无'
        }
      }
    }
}
</script>
<style lang="less" scoped>
#g6Service {
    width: 500px;
    height: 100%;
    position: relative;
}
#section {
    display: flex;
    justify-content: space-between;
}
</style>