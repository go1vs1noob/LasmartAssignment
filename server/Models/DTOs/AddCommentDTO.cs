using System.ComponentModel.DataAnnotations;

namespace server.Models.DTOs;

public class AddCommentDTO
{
    [Required]
    public int PointId { get; set; }
    [Required]
    public string Text { get; set; }
    [Required]
    public string ColorHex { get; set; }
}