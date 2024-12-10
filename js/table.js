// 獲取所有擁有 "available" 或 "unavailable" 類別的 td 元素
const cells = document.querySelectorAll('td.available, td.unavailable');

cells.forEach(cell => {
    cell.addEventListener('click', function() {
        // 如果當前是 "available"，則改為 "unavailable"，反之亦然
        if (this.classList.contains('available')) {
            this.classList.remove('available');
            this.classList.add('unavailable');
        } else if (this.classList.contains('unavailable')) {
            this.classList.remove('unavailable');
            this.classList.add('available');
        }
    });
});
