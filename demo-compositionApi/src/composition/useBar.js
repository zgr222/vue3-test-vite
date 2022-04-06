import { computed, ref, watch, watchEffect } from 'vue';
import gsap from 'gsap';

const colors = ["#334552", "#B34335", "#6E9FA5", "#A2C3AC", "#C8846C"];

export default function useGdpBar(gdpRef, maxSzie) {
  const max = computed(() => {
    if (gdpRef.value.length) {
      return Math.max(...gdpRef.value.map(it => it.value))
    }
    return 0;
  })
  const bars = ref([]);
  const targetBars = computed(() => {
    return gdpRef.value.map((it, i) => {
      let size = (it.value / max.value) * maxSzie;
      return {
        ...it,
        size,
        color: colors[i % colors.length]
      }
    });
  });

  watchEffect(
    () => {
      for (let i = 0; i < targetBars.value.length; i++) {
        if (!bars.value[i]) {
          bars.value[i] = {
            ...targetBars.value[i],
            size: 0,
            value: 0
          }
        }
        gsap.to(bars.value[i], {
          ...targetBars.value[i],
          duration: 1
        })
      }
    },
  );
  // watch(
  //   targetBars,
  //   (newValue) => {
  //     for (let i = 0; i < newValue.length; i++) {
  //       if (!bars.value[i]) {
  //         bars.value[i] = {
  //           ...newValue[i],
  //           size: 0,
  //           value: 0,
  //         };
  //       }
  //       gsap.to(bars.value[i], {
  //         ...newValue[i],
  //         duration: 1,
  //       });
  //     }
  //   },
  //   {
  //     deep: true,
  //   }
  // );
  return {
    bars
  }
}