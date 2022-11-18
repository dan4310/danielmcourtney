<script lang="ts">
    import type { PageData } from './$types'

    export let data: PageData;
</script>

<div class="page">
    <main class="page__container-lg">
        <h1>{data.project.title}</h1>
    </main>
</div>
