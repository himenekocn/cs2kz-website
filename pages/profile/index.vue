<script setup lang="ts">
const player = usePlayer()

navigateTo(`/profile/${player.value!.steam_id}`)
</script>
