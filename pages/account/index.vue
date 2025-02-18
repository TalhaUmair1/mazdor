<template>
    <div class=" my-4">
        <UCard class="max-w-md mx-auto">
            <div class="text-center">
                <div class="flex justify-center">
                    <img class="w-28 h-28 rounded-full" src="/images.jpg" alt="">
                </div>
                <h1 class="my-3 text-3xl font-medium">Account Details</h1>
            </div>
            <UForm class="space-y-4">
                <UFormGroup label="Upload photo" name="file">
                    <UInput size="lg" type="file" />
                </UFormGroup>

                <UFormGroup label="Full Name" name="Name">
                    <UInput size="lg" type="text" placeholder="Full Name" />
                </UFormGroup>

                <UFormGroup label="Email" name="Email">
                    <UInput size="lg" type="email" placeholder="Email" />
                </UFormGroup>

                <UFormGroup label="Phone No" name="Phone">
                    <UInput size="lg" type="text" placeholder="Phone No" />
                </UFormGroup>

                <UFormGroup label="WhatsApp No" name="WhatsApp No">
                    <UInput size="lg" type="text" placeholder="WhatsApp No" />
                </UFormGroup>
                <div class="text-center">
                    <UButton class="w-full py-3 flex justify-center items-center" type="submit">
                        Save
                    </UButton>
                </div>
            </UForm>
        </UCard>

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>