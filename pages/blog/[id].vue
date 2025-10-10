<script setup lang="ts">
definePageMeta({
  layout: 'default',
  headerBg: 'primary',
})
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PostHero from '@/sections/blog/PostHero.vue'
import PostContent from '@/components/blog/detail/PostContent.vue'
import {
  useBlogPosts,
  type BlogPostDetail,
  type BlogPost,
} from '@/composables/useBlogPosts'

const route = useRoute()
const { fetchPostById, fetchPosts } = useBlogPosts()

const post = ref<BlogPostDetail | null>(null)
const related = ref<BlogPost[]>([])

async function load(id: string) {
  post.value = await fetchPostById(id)
  const { items } = await fetchPosts({ page: 1, perPage: 5 })
  related.value = items.filter((p) => p.id !== id).slice(0, 4)
}

onMounted(() => {
  const id = String(route.params.id)
  load(id)
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) load(String(newId))
  }
)
</script>

<template>
  <div class="w-full pt-20">
    <PostHero
      v-if="post"
      :title="post.title"
      :excerpt="post.excerpt"
      :image="post.image"
      :date="post.date"
      :readTime="post.readTime"
      :author="post.author"
      tag="Design"
    />

    <section class="container mx-auto px-6 py-8">
      <div class="mx-auto max-w-6xl grid lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8">
          <PostContent v-if="post" :content="post.content" />
        </div>
      </div>
    </section>
  </div>
</template>
