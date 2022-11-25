<template>
    <div class="navbar">
        <div class="left-side">
            <a-space>
                <img alt="logo"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image" />
                <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5">
                    Rye
                </a-typography-title>
            </a-space>
        </div>
        <ul class="right-side">
            <li>
                <a-tooltip content="搜索">
                    <a-button class="nav-btn" type="outline" shape="circle">
                        <template #icon>
                            <icon-search />
                        </template>
                    </a-button>
                </a-tooltip>
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
}

.left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
}

.right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;

    :deep(.locale-select) {
        border-radius: 20px;
    }

    li {
        display: flex;
        align-items: center;
        padding: 0 10px;
    }

    .nav-btn {
        border-color: rgb(var(--gray-2));
        color: rgb(var(--gray-8));
        font-size: 16px;
    }
}
</style>