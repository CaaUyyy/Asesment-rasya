$(document).ready(function() {
    
    function hitungTotalSetelahPajak(totalSebelumPajak) {
        var pajak = totalSebelumPajak * 0.1;
        var totalSetelahPajak = totalSebelumPajak - pajak;
        return {
            pajak: pajak,
            totalSetelahPajak: totalSetelahPajak
        };
    }

    function updateTotal(total) {
        $('#totalPrice').text('Rp. ' + total.toLocaleString('id-ID'));
    }

    function updatePajak(pajak) {
        $('#taxDiscount').text('Rp. ' + pajak.toLocaleString('id-ID'));
    }

    function updateTotalAmount(totalAmount) {
        $('#totalAmount').text('Rp. ' + totalAmount.toLocaleString('id-ID'));
    }

    $('.isi').on('click', function() {
        var $clickedItem = $(this);
        var itemName = $clickedItem.find('p').first().text().trim();
        var itemPriceText = $clickedItem.find('h1').text().trim();
        var itemPrice = parseFloat(itemPriceText.replace('Rp. ', '').replace('.', '').replace(',', '.'));

        if (!isNaN(itemPrice)) {
            var isItemExist = $('.belanja .barang .detail-kiri p:first-child').filter(function() {
                return $(this).text().trim() === itemName;
            }).length > 0;

            if (!isItemExist) {
                var newElement = `
                    <div class="barang">
                        <div class="detail-kiri">
                            <p>${itemName}</p>
                            <p class="normal">Unit Price: ${itemPriceText}</p>
                        </div>
                        <div class="detail-kanan">
                            <p style="text-align: right; font-size: small;">${itemPriceText}</p>
                            <p class="normal" style="display: flex; justify-content: space-between; gap: 4em;">Quantity: 1</p>
                        </div>
                        <button class="remove">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                `;

                $('.belanja').append(newElement);

                var totalPriceText = $('#totalPrice').text().trim();
                var currentTotal = parseFloat(totalPriceText.replace('Rp. ', '').replace('.', '').replace(',', '.')) || 0;
                var newTotal = currentTotal + itemPrice;

                var { pajak, totalSetelahPajak } = hitungTotalSetelahPajak(newTotal);

                updateTotal(newTotal);
                updatePajak(pajak);
                updateTotalAmount(totalSetelahPajak);
            } else {
                alert('Item sudah ada dalam keranjang belanja.');
            }
        } else {
            alert('Harga item tidak valid');
        }
    });

    $('.belanja').on('click', '.remove', function() {
        var $item = $(this).closest('.barang');
        var itemPriceText = $item.find('.detail-kiri .normal').text().trim();
        var itemPrice = parseFloat(itemPriceText.replace('Unit Price: Rp. ', '').replace('.', '').replace(',', '.'));

        if (!isNaN(itemPrice)) {
            var totalPriceText = $('#totalPrice').text().trim();
            var currentTotal = parseFloat(totalPriceText.replace('Rp. ', '').replace('.', '').replace(',', '.')) || 0;

            var totalAfterRemove = currentTotal - itemPrice; // Hitung total setelah dikurangi harga item yang dihapus

            updateTotal(totalAfterRemove);

            var { pajak, totalSetelahPajak } = hitungTotalSetelahPajak(totalAfterRemove);

            updatePajak(pajak);
            updateTotalAmount(totalSetelahPajak);

            $item.remove(); // Hapus elemen item dari keranjang belanja
        } else {
            alert('Harga item tidak valid');
        }
    });
});