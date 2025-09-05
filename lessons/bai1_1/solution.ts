import crypto from "crypto";

export type Block = {
  index: number;
  timestamp: string;
  transactions: any[];
  previous_hash: string;
  current_hash: string;
};

// 📝 Hàm kiểm tra block hợp lệ
export function isValidBlock(block: Block): boolean {
  // Ghép dữ liệu cần hash
  const data =
    block.index.toString() +
    block.timestamp +
    JSON.stringify(block.transactions) +
    block.previous_hash;

  // Tính SHA256
  const hash = crypto.createHash("sha256").update(data).digest("hex");

  // So sánh với current_hash
  return hash === block.current_hash;
}
