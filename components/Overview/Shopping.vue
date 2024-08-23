<template>
  <div>
    <h2 class="text-lg font-semibold text-center">Pregnancy Shopping List</h2>
    <div class="flex gap-2 mt-2">
      <Input placeholder="Search for items" v-model.trim="item" />
      <Button @click="addItem">Add Item</Button>
    </div>
    <div>
      <TransitionGroup name="list-item" tag="ol" class="list-decimal">
        <li
          v-for="(item, index) in itemsList"
          :key="index"
          class="text-neutral-700 flex justify-between py-1 list-decimal"
        >
          {{ item }}
          <Icon
            @click="removeItem(index)"
            class="rounded-full p-3 text-pink-500 cursor-pointer shadow"
            name="zondicons:minus-solid"
          />
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
//shopping list
const item = ref("");
const itemsList = ref<string[]>([]);
const addItem = () => {
  if (item.value) {
    itemsList.value.push(item.value);
    item.value = "";
  }
};
const removeItem = (index: number) => {
  itemsList.value.splice(index, 1);
};
</script>

<style scoped>
.list-item-enter-active,
.list-item-leave-active {
  transition: all 0.3s ease;
}

.list-item-enter-from,
.list-item-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
