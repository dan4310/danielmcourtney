<script lang="ts">
	import JobCard from '$lib/components/JobCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>
<div class="page">
    <main class="page__container-lg">
        <h1>Admin Experience</h1>
        <section>
            <h2>New Job</h2>
            <form method="POST" action="?/createJob">
                <input class="form-control" type="text"
                    name="company" id="company" placeholder="Company"
                />
                <input class="form-control" type="text"
                    name="position" id="position" placeholder="Position"
                />
                <input class="form-control" type="text"
                    name="location" id="location" placeholder="Location"
                />
                <input class="form-control" type="text"
                    name="details" id="details" placeholder="Details"
                />
                <input class="form-control" type="date"
                    name="startDate" id="startDate" placeholder="Start Date"
                />
                <input class="form-control" type="date"
                    name="endDate" id="endDate" placeholder="End Date"
                />
                <button type="submit" class="btn-primary">Add</button>
            </form>
        </section>

        <section>
            <h2>Jobs</h2>
            <ul class="container">
                {#each data.jobs as job (job.id)}
                    <li class="item"><JobCard {job} /></li>
                {/each}
            </ul>
        </section>
</div>


<style lang="scss">
    @use '../../../styles/variables' as var;
    @use '../../../styles/breakpoints' as b;

    .container {
        display: flex;
        flex-direction: column;
        gap: var.$padding-md;

        @include b.break(sm) {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }

    section {
        h2 {
            margin: var.$padding-md 0;
        }
    }
</style>


