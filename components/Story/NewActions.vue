<template>
  <div class="flex items-center justify-around">
    <CardButton
      class="rounded-lg bg-red-400 text-white hover:bg-red-500"
      @click.prevent="() => stores.story.resetForm()"
    >
      清除
    </CardButton>
    <CardButton
      class="rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
      @click.prevent="handleCreate"
    >
      新增
    </CardButton>
  </div>
</template>

<script setup lang="ts">
import type { Story } from '@/types';
import { NewStorySchema } from '@/types';

const { getTokenSilently } = useAuth();
const stores = {
  issue: useIssueStore(),
  story: useStoryStore(),
};
const { issueId } = storeToRefs(stores.issue);
const { currentStory, loading } = storeToRefs(stores.story);

const handleCreate = async () => {
  try {
    loading.value = true;

    currentStory.value = {
      title: '預設故事標題',
      content: '預設故事內容',
      ...Object.fromEntries(
        Object.entries(currentStory.value).filter(([k, v]) => v)
      ),
    };

    const el = NewStorySchema.parse(currentStory.value);

    console.log('Creating: ', el);
    let token = await getTokenSilently();
    const { data: createdStory } = await fetchResource<Story>(
      token,
      `/api/issues/${issueId.value}/stories`,
      {
        method: 'post',
        body: { ...el },
      }
    );
    console.log('Created: ', createdStory);

    token = await getTokenSilently();
    await stores.story.update(token);
    stores.story.resetForm();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>
