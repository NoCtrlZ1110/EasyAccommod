using Abp.Extensions;
using Castle.Core.Internal;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace UET.EasyAccommod.Helpers
{
    public static class StringHelper
    {
        public static bool ContainDigit(this string s)
        {
            int len = s.Length;
            for (int i = 0; i < len; ++i)
            {
                char c = s[i];
                if (c >= '0' && c <= '9')
                    return true;
            }
            return false;
        }

        public static string Unsigned(this string s)
        {
            string[] arr1 = new string[] { "á", "à", "ả", "ã", "ạ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ",
                "đ",
                "é","è","ẻ","ẽ","ẹ","ê","ế","ề","ể","ễ","ệ",
                "í","ì","ỉ","ĩ","ị",
                "ó","ò","ỏ","õ","ọ","ô","ố","ồ","ổ","ỗ","ộ","ơ","ớ","ờ","ở","ỡ","ợ",
                "ú","ù","ủ","ũ","ụ","ư","ứ","ừ","ử","ữ","ự",
                "ý","ỳ","ỷ","ỹ","ỵ",};
            string[] arr2 = new string[] { "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
                "d",
                "e","e","e","e","e","e","e","e","e","e","e",
                "i","i","i","i","i",
                "o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o",
                "u","u","u","u","u","u","u","u","u","u","u",
                "y","y","y","y","y",};
            for (int i = 0; i < arr1.Length; i++)
            {
                s = s.Replace(arr1[i], arr2[i]);
                s = s.Replace(arr1[i].ToUpper(), arr2[i].ToUpper());
            }
            return s;
        }

        public static string Normal(this string s)
        {
            string[] arr1 = new string[] { "í́" };
            string[] arr2 = new string[] { "í" };
            for (int i = 0; i < arr1.Length; i++)
            {
                s = s.Replace(arr1[i], arr2[i]);
                s = s.Replace(arr1[i].ToUpper(), arr2[i].ToUpper());
            }
            return s;
        }

        public static string ReplaceLastOccur(this string s, string replaceStr)
        {
            var lastIndex = s.LastIndexOf(replaceStr, StringComparison.Ordinal);
            var rs = "";
            if (lastIndex > 0)
            {
                rs = s.Substring(0, lastIndex);
            }
            var endRaplaceStrIndex = lastIndex + replaceStr.Length;
            var lastLength = s.Length - endRaplaceStrIndex;
            if (lastLength > 0)
            {
                var afterStr = s.Substring(endRaplaceStrIndex, lastLength);
                rs += afterStr;
            }
            return rs;
        }
        public static string ConvertToUnsign(this string s)
        {
            if (s.IsNullOrEmpty())
            {
                return "";
            }
            s = RemoveWhitespace(s).ToLower();
            var stFormD = s.Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder();

            foreach (var t in stFormD)
            {
                System.Globalization.UnicodeCategory uc = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(t);
                if (uc != System.Globalization.UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(t);
                }
            }
            sb = sb.Replace('Đ', 'D');
            sb = sb.Replace('đ', 'd');
            return sb.ToString().Normalize(NormalizationForm.FormD);
        }

        public static bool IsNumber(this string s)
        {
            int n;
            var isNumeric = int.TryParse(s, out n);
            return isNumeric;
        }

        public static string ConvertStringtoMd5(this string strword)
        {
            MD5 md5 = MD5.Create();
            byte[] inputBytes = Encoding.ASCII.GetBytes(strword);
            byte[] hash = md5.ComputeHash(inputBytes);
            StringBuilder sb = new StringBuilder();

            foreach (byte t in hash)
            {
                sb.Append(t.ToString("x2"));
            }
            return sb.ToString();
        }
        public static string RemoveWhitespace(this string input)
        {
            return new string(input.ToCharArray()
                .Where(c => !Char.IsWhiteSpace(c))
                .ToArray());
        }
    }
}
